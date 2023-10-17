﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskApplication.DTO
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Priority { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime? UpdateTime { get; set; }

    }
}
