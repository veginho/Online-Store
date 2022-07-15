using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
	public class CartItems
	{
		public int id { get; set; }
		public Product produs { get; set; }
		public int qty { get; set; }
	}
}
