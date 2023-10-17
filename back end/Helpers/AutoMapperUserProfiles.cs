using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using TaskApplication.DTO;
using TaskApplication.Entities;

namespace TaskApplication.Helpers
{
    public class AutoMapperUserProfiles : Profile
    {
        public AutoMapperUserProfiles()
        {
            CreateMap<AppUser, MemberDto>().ReverseMap();
            CreateMap<Entities.Task, TaskDto>().ReverseMap();
        }

    }
}
