using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class ShopList
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
        public virtual Credential User { get; set; }
    }
}
