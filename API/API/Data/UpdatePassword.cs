using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
	public class UpdatePassword
	{
		public string oldPassword { get; set; }
		public string newPassword { get; set; }
	}
}
