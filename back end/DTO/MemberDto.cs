using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskApplication.DTO
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public bool IsActive { get; set; }

    }
}
