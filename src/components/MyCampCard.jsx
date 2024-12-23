import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin3Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const MyCampCard = ({ d, setDonations }) => {
  const { dark } = useContext(AuthContext);
  const navigate = useNavigate();
  const { _id, name, dateLost, type, photoURL, title, lostlocation } = d;

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // delete data
          fetch(`http://localhost:5000/myitems/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                setDonations((prevDonations) =>
                  prevDonations.filter((donation) => donation._id !== id)
                );
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your campagion has been deleted.",
                  icon: "success",
                });
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your CAMPAGION is safe",
            icon: "error",
          });
        }
      });
  };

  const handleEdit = (id) => {
    Swal.fire({
      title: "Do you want to Change Your documnets?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Change",
      denyButtonText: `Don't Change`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate(`/items/update/${id}`);
      } else if (result.isDenied) {
        Swal.fire("Documents Change is stoped", "", "info");
      }
    });
  };
  return (
    <>
      <tr
        className={`${dark ? "border-gray-500" : "border-gray-200"} border-b `}
      >
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={photoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div className="max-sm:w-[250px]">
              <div className="font-bold">
                {title.length > 50 ? `${title.substring(0, 20)}...` : title}
              </div>
              <div className="text-sm opacity-50">Author: {name}</div>
            </div>
          </div>
        </td>
        <td className="text-justify">{lostlocation}</td>
        <td className="text-justify"></td>
        <td>{type}</td>
        <div className="max-sm:w-[120px]">
          <div className="max-sm:w-[120px]">
            <td>{new Date(dateLost).toLocaleDateString("en-GB")}</td>
          </div>
          <td></td>
        </div>
        <th>
          <Link
            to={`/lost-finds/all/details/${_id}`}
            className="btn btn-ghost btn-xs"
          >
            details
          </Link>
          <button
            onClick={() => handleEdit(_id)}
            className="btn btn-ghost btn-xs"
          >
            <MdModeEditOutline />
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-ghost btn-xs"
          >
            <RiDeleteBin3Fill />
          </button>
        </th>
      </tr>
    </>
  );
};

export default MyCampCard;
