using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class Product
    {
        public Product()
        {
            ShopLists = new HashSet<ShopList>();
        }

        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }

        public virtual ICollection<ShopList> ShopLists { get; set; }
    }
}
