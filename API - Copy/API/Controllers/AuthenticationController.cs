using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private AmanetStoreContext _db;

        public AuthenticationController(AmanetStoreContext db)
        {
            _db = db;
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var users = _db.Credentials.ToList();

            return new JsonResult(users);
        }


        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] AuthenticationMessage message)
        {
            if (message.username == null || message.password == null)
                return BadRequest();

            var user = _db.Credentials.Where(a => a.Username == message.username).FirstOrDefault();
            if (user != null)
                return new JsonResult("User already exists!");

            Credential newCredentials = new Credential();

            newCredentials.Username = message.username;
            newCredentials.Password = message.password;

            _db.Credentials.Add(newCredentials);
            _db.SaveChanges();

            Utils.userId = _db.Credentials.Where(a => a.Username == message.username && a.Password == message.password).Select(a => a.Id).FirstOrDefault();

            return new JsonResult("User added successfully");
        }


        [HttpPost("login")]
        public IActionResult LogIn([FromBody] AuthenticationMessage message)
        {
            if (message.username == null || message.password == null)
                return BadRequest();


            Credential credentials = new Credential();
            credentials.Password = message.password;
            credentials.Username = message.username;

            var credentialsFound = _db.Credentials.Where(a =>
                                a.Username == credentials.Username && a.Password == credentials.Password).SingleOrDefault();

            
            if (credentialsFound == null)
                return NotFound();
            else
            {
                Utils.userId = _db.Credentials.Where(a => a.Username == message.username && a.Password == message.password).Select(a => a.Id).FirstOrDefault();

                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Logged in successfully!",
                });
            }
        }


        [HttpPost("updatepass")]
        public IActionResult UpdatePassword([FromBody]  UpdatePassword fields)
		{
            var aux = _db.Credentials.Single(a => a.Password == fields.oldPassword);
            if(aux==null)
			{
                return new JsonResult("Parola nu a fost gasita in baza de date");
			}
            aux.Password = fields.newPassword;
            _db.SaveChanges();
            return new JsonResult("Parola schimbata cu succes");
		}
    }
}
