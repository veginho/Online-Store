using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class Credential
    {
        public Credential()
        {
            ShopLists = new HashSet<ShopList>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public virtual ICollection<ShopList> ShopLists { get; set; }
    }
}
