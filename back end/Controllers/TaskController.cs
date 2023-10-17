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
    public class TaskController : BaseApiController
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;

        public TaskController(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        
        [HttpGet]
        [Route("getAllTasks")]
        public async  Task<ActionResult<IEnumerable<TaskDto>>> GetAllTasks()
        {
            var Task = await _taskRepository.GetAllTasksAsync();
            var TaskList = _mapper.Map<IEnumerable<TaskDto>>(Task);

            return Ok(TaskList);
        }


        [HttpGet]
        [Route("taskById/{id}")]
        public async  Task<ActionResult<TaskDto>> GetTaskById(int id)
        {
            return Ok(_mapper.Map<TaskDto>(await _taskRepository.GetTaskByIdAsync(id)));
        }

        [HttpGet]
        [Route("tasByTitle/{title}")]
        public async Task<ActionResult<TaskDto>> GetTaskByTitle(string title)
        {
            return Ok(_mapper.Map<TaskDto>(await _taskRepository.GetTaskByTitleAsync(title)));
        }

        [HttpPost]
        [Route("insertTask")]
        public async Task<ActionResult> InsertTask(TaskDto taskDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _taskRepository.InsertNewTask(taskDto);
            if (result)
                return Ok("Task added successfully");

            return BadRequest("Could not add");
        }



        [HttpPut]
        [Route("updateTask")]
        public async Task<ActionResult> UpdateUser([FromBody] TaskDto taskDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _taskRepository.UpdateTaskDetails(taskDto);
            if (result)
                return Ok("User updated successfully");

            return NotFound("User not found");
        }

        [HttpDelete]
        [Route("deleteTask/{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var result =await _taskRepository.DeleteTask(id);
            if (result)
                return Ok("Task deleted successfully");

            return NotFound("Task not found");
        }


        
    }
}
