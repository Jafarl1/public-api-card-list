import Swal from "sweetalert2";

export function addedProductAlert() {
  return Swal.fire({
    title: "Good job!",
    text: "You added a new product!",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Go to products page",
    confirmButtonColor: "#02bd02",
    cancelButtonText: "Stay here",
    cancelButtonColor: "#075985",
  });
}

export function errorAlert(text: string) {
  return Swal.fire({
    title: "Error!",
    text: text,
    icon: "error",
    confirmButtonColor: "#d33",
  });
}

export default function confirmDeletion(title: string) {
  return Swal.fire({
    title: "Are you sure?",
    text: `You are going to delete a product - ${title}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#075985",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
}

export function deletedAlert() {
  return Swal.fire({
    title: "Deleted!",
    text: "The product has been deleted.",
    icon: "success",
    confirmButtonColor: "#02bd02",
  });
}
