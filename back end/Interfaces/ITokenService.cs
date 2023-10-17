using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskApplication.Entities;

namespace TaskApplication
{
    public interface ITokenService
    {

        string CreateToken(AppUser user);
    }
}
