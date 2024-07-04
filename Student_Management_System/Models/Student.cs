using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Student_Management_System.Models
{
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public string Gender { get; set; }
        public int Class { get; set; }
        public int RollNo { get; set; }
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public long PhoneNumber { get; set; }

    }
}
