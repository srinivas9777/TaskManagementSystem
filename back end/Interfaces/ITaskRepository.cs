using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskApplication.DTO;
using TaskApplication.Entities;
using Task = TaskApplication.Entities.Task;

namespace TaskApplication.Interfaces
{
    public interface ITaskRepository
    {
        void Update(Entities.Task task);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Entities.Task>> GetAllTasksAsync();
        Task<Entities.Task> GetTaskByIdAsync(int id);
        Task<Entities.Task> GetTaskByTitleAsync(string title);
        Task<bool> InsertNewTask(TaskDto taskDto);
        Task<bool> UpdateTaskDetails(TaskDto taskDto);
        Task<bool> DeleteTask(int id);

    }
}
