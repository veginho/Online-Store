﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
	public class Filter
	{
		public int Minim { get; set; }
		public int Maxim { get; set; }

		public string SortType { get; set; }
	}
}
