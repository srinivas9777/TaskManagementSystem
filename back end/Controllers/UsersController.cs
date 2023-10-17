using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using TaskApplication.Data;
using TaskApplication.DTO;
using TaskApplication.Entities;
using TaskApplication.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TaskApplication.Controllers
{
    [Authorize]
    //[AllowAnonymous]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository,IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        
        [HttpGet]
        public async  Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            var usersList = _mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(usersList);
        }

        [HttpGet]
        [Route("activeUsers")]
        public async Task<ActionResult<List<MemberDto>>> GetActiveUsers()
        {
            return Ok(await _userRepository.GetActiveUsersFromProc());
        }

        [HttpGet]
        [Route("userById/{id}")]
        public async  Task<ActionResult<MemberDto>> GetUser(int id)
        {
            return Ok(_mapper.Map<MemberDto>(await _userRepository.GetUserByIdAsync(id)));
        }

        [HttpGet]
        [Route("userByUsername/{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return Ok(_mapper.Map<MemberDto>(await _userRepository.GetUserByUsernameAsync(username)));
        }

        [HttpPost]
        [Route("updateUser")]
        public async Task<ActionResult> UpdateUser([FromBody] MemberDto memberDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _userRepository.UpdateUserDetails(memberDto);
            if (result)
                return Ok("User updated successfully");

            return NotFound("User not found");
        }

        [HttpDelete]
        [Route("deleteuser/{id}")]
        public async Task<ActionResult> DeleteUser(int Id)
        {
            if (Id <= 0)
            {
                return BadRequest();
            }

            var result =await _userRepository.DeleteUser(Id);
            if (result)
                return Ok("User deleted successfully");

            return NotFound("User not found");
        }


        
    }
}
