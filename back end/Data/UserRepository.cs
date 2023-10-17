using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using TaskApplication.DTO;
using TaskApplication.Entities;
using TaskApplication.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace TaskApplication.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<List<MemberDto>> GetActiveUsersFromProc()
        {
            var activeUsers = await _context.Users.FromSqlRaw("Exec dbo.GetActiveUsers").ToListAsync();
            return _mapper.Map<List<MemberDto>>(activeUsers);
        }


        public async Task<bool> UpdateUserDetails(MemberDto memberDto)
        {
            var user = await _context.Users.FindAsync(memberDto.Id);
            if (user.Id <= 0) return false;

            user.UserName = memberDto.UserName;
            user.Email = memberDto.Email;
            user.Gender = memberDto.Gender;
            user.IsActive = memberDto.IsActive;
            user.DateOfBirth = memberDto.DateOfBirth;

            Update(user);
            return await SaveAllAsync();
            
        }

        public async Task<bool> DeleteUser(int userId)
        {

            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                _context.Users.Remove(user);
               return await SaveAllAsync();
            }
            return false;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;

        }

        private async Task<bool> UserExists(int userId)
        {
            return await _context.Users.AnyAsync(x => x.Id == userId);
        }
    }
}
