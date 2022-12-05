import axios from "axios";

export async function buyNow(item) {
  await axios.get("/api/user", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }).then(r => {
    axios.post("/api/carts/item", {
      user_id: r.data.id,
      item_id: item.id
    }, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(r => {
      alert(r.data.message);
    }).catch(reason => console.log(reason));
  }).catch(reason => console.log(reason));
}

export async function bookmark(item) {
  await axios.put("/api/item/bookmark/" + item.id, {}, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }).then(r => alert("Bookmarked item " + item.id)).catch(reason => console.log(reason))
}

export async function markCounterfeit(item) {
  await axios.put("/api/item/counterfeit/" + item.id, {}, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }).then(r => alert("Marked " + item.description + " as counterfeit."))
    .catch(reason => console.log(reason))
}

export async function markInappropriate(item) {
  await axios.put("/api/item/inappropriate/" + item.id, {}, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }).then(r => alert("Marked " + item.description + " as inappropriate."))
    .catch(reason => console.log(reason))
}
