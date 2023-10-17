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
using Task = TaskApplication.Entities.Task;

namespace TaskApplication.Data
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TaskRepository(DataContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Entities.Task> GetTaskByIdAsync(int id)
        {
            return await _context.Task.FindAsync(id);
        }

        public async Task<Entities.Task> GetTaskByTitleAsync(string title)
        {
            return await _context.Task.SingleOrDefaultAsync(x => x.Title == title);
        }

        public async Task<bool> InsertNewTask(TaskDto taskDto)
        {
            var task = _mapper.Map<Task>(taskDto);
            _context.Task.Add(task);
             return await SaveAllAsync();
        }

        public async Task<IEnumerable<Entities.Task>> GetAllTasksAsync()
        {
            return await _context.Task.ToListAsync();
        }
        

        public async Task<bool> UpdateTaskDetails(TaskDto taskDto)
        {
            var task = await _context.Task.FindAsync(taskDto.Id);
            if (task.Id <= 0) return false;

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.Priority = taskDto.Priority;
            task.DueDate = taskDto.DueDate;
            task.Status = taskDto.Status;
            task.UpdateTime = DateTime.UtcNow;

            Update(task);
            return await SaveAllAsync();
            
        }

        public async Task<bool> DeleteTask(int id)
        {

            var task = await _context.Task.FindAsync(id);
            if (task != null)
            {
                _context.Task.Remove(task);
               return await SaveAllAsync();
            }
            return false;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Task task)
        {
            _context.Entry(task).State = EntityState.Modified;

        }

    }
}
