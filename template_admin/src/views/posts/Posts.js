import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import "../Events/Event.css";

import { MDBCol } from "mdbreact";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [cookies, _] = useCookies(["token"]);

  const [posts, setData] = useState([]);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this event?`)) {
      axios
        .delete(`http://localhost:8000/api/post/${id}`
        )
        .then((response) => {
          console.log("Item deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting item", error);
        });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/post/getpost").then((response) => {
      setData(response.data);
    });
  }, [handleDelete]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(
    posts.filter(
      (u) => u.message.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ).length / itemsPerPage
  );

  //show more/less
  const [showFullMessage, setShowFullMessage] = useState(false);

  const toggleShowFullMessage = () => {
    setShowFullMessage(!showFullMessage);
  };

  return (
    <>
      <MDBCol md="6">
        <div className="input-group md-form form-sm form-1 pl-0">
          <div className="input-group-prepend">
            <span
              className="input-group-text purple lighten-3"
              id="basic-text1"
            ></span>
          </div>
          <input
            className="form-control my-0 py-1"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </MDBCol>

      <br></br>
      <CCard className="text-center">
        <CCardHeader>
          {" "}
          <CCardTitle style={{ color: "#3622e8" }}>
            Posts Management
            <hr />{" "}
          </CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">message</CTableHeaderCell>
                <CTableHeaderCell scope="col">post images</CTableHeaderCell>
                <CTableHeaderCell scope="col">post videos</CTableHeaderCell>

                <CTableHeaderCell scope="col">Options</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {cookies.access_token &&
                posts
                  .filter((e) => e.message.toLowerCase().includes(query))
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((e) => (
                    <CTableRow key={e._id}>
                      {e.message.split(" ").length <= 5 ? (
                        <CTableDataCell>{e.message}</CTableDataCell>
                      ) : (
                        <CTableDataCell>
                          {showFullMessage
                            ? e.message
                            : `${e.message
                                .split(" ")
                                .slice(0, 4)
                                .join(" ")}....`}{" "}
                          <button
                            onClick={toggleShowFullMessage}
                            style={{
                              color: "rgb(10, 68, 93)",
                              border: "none",
                              backgroundColor: "none",
                            }}
                          >
                            {showFullMessage ? "  Show less" : "Show more"}
                          </button>
                        </CTableDataCell>
                      )}
                      <CTableDataCell>
                        {" "}
                        {e.img && (
                          <img src={e.img} style={{ width: "200px" }} />
                        )}{" "}
                      </CTableDataCell>
                      <CTableDataCell>
                        {e.video && (
                          <video
                            controls
                            style={{ width: "200px", height: "100px" }}
                          >
                            <source src={e.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          variant="ghost"
                          onClick={() => 
                            handleDelete(e._id)}
                        >
                          Delete Post
                        </CButton>{" "}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
            </CTableBody>
          </CTable>

          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Posts;
