using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskApplication.DTO;
using TaskApplication.Entities;

namespace TaskApplication.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<List<MemberDto>> GetActiveUsersFromProc();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<bool> UpdateUserDetails(MemberDto memberDto);
        Task<bool> DeleteUser(int userId);

    }
}
