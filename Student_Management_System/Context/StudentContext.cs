using Microsoft.EntityFrameworkCore;
using Student_Management_System.Models;

namespace Student_Management_System.Context
{
    public class StudentContext :DbContext
    {
        public StudentContext(DbContextOptions dbcontext) : base(dbcontext) { }

        public DbSet<Student> Students { get; set; } 
        
    }
}
