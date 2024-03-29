import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Header } from "./components/header";
import AuthContext from "../utils/AuthContext";
import { Modal4 } from "./components/modal";
import useModal from "./components/hooks/useModal";

const Items = () => {
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/carts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setNotes(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  let deleteCartItem = async (e) => {
    let id =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute(
        "data-index"
      );
    let response = await fetch(`/api/carts/${id}/delete/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    await response.json();

    if (response.status === 200) {
      window.location.reload();
    } else {
      logoutUser();
    }
  };

  let UpdateQuantityItem = async (e) => {
    let id =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute(
        "data-index"
      );
    let response = await fetch(`/api/carts/${id}/${quantity.text}/update/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    await response.json();

    if (response.status === 200) {
      window.location.reload();
    } else {
      logoutUser();
    }
  };

  let [quantity, setQuantity] = useState([]);
  let [showButton, setShowButton] = useState(false);

  return (
    <div>
      {notes.map((user) => (
        <table id="table-bawah" data-index={user[5]} key={user[5]}>
          <tr>
            <td>
              {user[0]} {user[1]}
            </td>
            <td className="quantity-box">
              <input
                type="number"
                defaultValue={user[2]}
                name="quantity"
                onChange={(e) => {
                  setQuantity({ text: e.target.value });
                  setShowButton(true);
                }}
              ></input>
            </td>
            <td>Rp. {user[3]}</td>
            <td>Rp. {user[4]}</td>

            <td id="cartbutton">
              <button className="cartdelete" onClick={deleteCartItem}>
                <i class="fa fa-trash"></i>
              </button>

              {showButton ? (
                <button className="cartsave" onClick={UpdateQuantityItem}>
                  <i class="fa fa-save"></i>
                </button>
              ) : null}
            </td>
          </tr>
        </table>
      ))}
    </div>
  );
};

const Totalprice = () => {
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);
  let { modalOpen, close, open } = useModal();
  let { user } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/price/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setNotes(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div id="box-bawah">
      <div id="total-box">Total : Rp. {notes[2]}</div>
      <div>
        <button
          onClick={() => {
            modalOpen ? close() : open();
          }}
        >
          Buy now
        </button>
        {user
          ? modalOpen === true && <Modal4 handleClose={close} />
          : modalOpen === true && <Modal4 handleClose={open} />}
      </div>
    </div>
  );
};

export class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section className="container py-5">
          <div className="row text-center pt-5 pb-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">CART</h1>
            </div>
          </div>

          <div>
            <table className="table-atas">
              <tr>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </table>
          </div>
          <Items />
          <Totalprice />
        </section>

        <footer className="bg-dark" id="tempaltemo_footer">
          <div className="container">
            <div className="row text-light mb-4">
              <div className="col-12 mb-3">
                <div className="w-100 my-3 border-top border-light"></div>
              </div>
              <div className="col-auto me-auto">
                <ul className="list-inline text-left footer-icons">
                  <li className="list-inline-item border border-light rounded-circle text-center">
                    <a
                      className="text-light text-decoration-none"
                      target="_blank"
                      href="http://facebook.com/"
                    >
                      <i className="fab fa-facebook-f fa-lg fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item border border-light rounded-circle text-center">
                    <a
                      className="text-light text-decoration-none"
                      target="_blank"
                      href="https://www.instagram.com/"
                    >
                      <i className="fab fa-instagram fa-lg fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item border border-light rounded-circle text-center">
                    <a
                      className="text-light text-decoration-none"
                      target="_blank"
                      href="https://twitter.com/"
                    >
                      <i className="fab fa-twitter fa-lg fa-fw"></i>
                    </a>
                  </li>
                  <li className="list-inline-item border border-light rounded-circle text-center">
                    <a
                      className="text-light text-decoration-none"
                      target="_blank"
                      href="https://www.linkedin.com/"
                    >
                      <i className="fab fa-linkedin fa-lg fa-fw"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-100 bg-black py-3">
            <div className="container">
              <div className="row pt-2">
                <div className="col-12">
                  <p className="text-left text-light">
                    Copyright &copy; 2021 Company Name | Designed by{" "}
                    <a
                      rel="sponsored"
                      href="https://templatemo.com"
                      target="_blank"
                    >
                      TemplateMo
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Helmet>
          <script src="static/js/jquery-1.11.0.min.js"></script>
          <script src="static/js/jquery-migrate-1.2.1.min.js"></script>
          <script src="static/js/bootstrap.bundle.min.js"></script>
          <script src="static/js/templatemo.js"></script>
          <script src="static/js/custom.js"></script>
        </Helmet>
      </div>
    );
  }
}

export default Home;
