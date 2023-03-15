import React from "react";

function BuildingsTablePage() {
  return(
    <section className="container mt-3">
      <div className="table-responsive">
        <div className="table-wrapper">

          <div className="table-title mb-3">
            <div className="row">
              <div className="col-sm-6">
                <h2>Administrar <b>edificios</b></h2>
              </div>
              <div className="col-sm-6 d-flex m-auto justify-content-end">
                <a href="/" className="btn btn-success me-1" data-toggle="modal"><i class="fa-solid fa-plus"></i> <span>Añadir edificio</span></a>
                <a href="/" className="btn btn-danger ms-1" data-toggle="modal"><i class="fa-solid fa-trash"></i> <span>Eliminar</span></a>						
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">

            <thead>
              <tr>
                <th>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="selectAll" />
                    <label for="selectAll"></label>
                  </span>
                </th>
                <th>Edificio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                    <label for="checkbox1"></label>
                  </span>
                </td>
                <td>Edificio A</td>
                <td>
                  <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i class="fa-solid fa-pen"></i></a>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i class="fa-solid fa-trash"></i></a>
                </td>
              </tr>

              <tr>
                <td>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                    <label for="checkbox1"></label>
                  </span>
                </td>
                <td>Edificio B</td>
                <td>
                  <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i class="fa-solid fa-pen"></i></a>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i class="fa-solid fa-trash"></i></a>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                    <label for="checkbox1"></label>
                  </span>
                </td>
                <td>Edificio C</td>
                <td>
                  <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i class="fa-solid fa-pen"></i></a>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i class="fa-solid fa-trash"></i></a>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                    <label for="checkbox1"></label>
                  </span>
                </td>
                <td>Edificio D</td>
                <td>
                  <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i class="fa-solid fa-pen"></i></a>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i class="fa-solid fa-trash"></i></a>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                    <label for="checkbox1"></label>
                  </span>
                </td>
                <td>Edificio E</td>
                <td>
                  <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i class="fa-solid fa-pen"></i></a>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i class="fa-solid fa-trash"></i></a>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                    <label for="checkbox1"></label>
                  </span>
                </td>
                <td>Edificio F</td>
                <td>
                  <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i class="fa-solid fa-pen"></i></a>
                  <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i class="fa-solid fa-trash"></i></a>
                </td>
              </tr>

            </tbody>

          </table>
        </div>
      </div>
    </section>  
  );
}

export default BuildingsTablePage;