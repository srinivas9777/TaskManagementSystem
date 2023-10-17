using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskApplication.Entities;
using Microsoft.EntityFrameworkCore;

namespace TaskApplication.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Entities.Task> Task { get; set; }

    }
}
