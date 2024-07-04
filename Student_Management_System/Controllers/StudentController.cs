using Microsoft.AspNetCore.Mvc;
using Student_Management_System.Context;
using Student_Management_System.Models;

namespace Student_Management_System.Controllers
{
    public class StudentController : Controller
    {
        private readonly StudentContext context;

        public StudentController(StudentContext context)
        {
            this.context= context;
        }


        public IActionResult Index()
        {
            return View();
        } 

        [HttpGet]
        public IActionResult GetStudents()
        {
            List<Student> students = context.Students.ToList();
            return new JsonResult(students);
        }

		[HttpPost]
		public JsonResult AddStudent(Student studentmodel)
		{
			var student = new Student()
			{
				StudentName=studentmodel.StudentName,
                Gender=studentmodel.Gender,
                Class=studentmodel.Class,
                RollNo=studentmodel.RollNo,
                DOB=studentmodel.DOB,
                Address=studentmodel.Address,
                City=studentmodel.City,
                PhoneNumber=studentmodel.PhoneNumber,

			};
			context.Students.Add(student);
			context.SaveChanges();
			return new JsonResult("data is been added");
		}

		public JsonResult Delete(int studentid)
		{
			var data = context.Students.Where(e => e.StudentId == studentid).SingleOrDefault();
			context.Students.Remove(data);
			context.SaveChanges();
			return new JsonResult("data deleted");
		}

		[HttpGet]
		public JsonResult Edit(int studentId)
		{
			var data = context.Students.Where(e => e.StudentId == studentId).SingleOrDefault();
			return new JsonResult(data);

		}

		[HttpPost]
		public JsonResult UpdateStudent(Student student)
		{
			context.Students.Update(student);
			context.SaveChanges();
			return new JsonResult("Record updatated");
		}


	}
}
