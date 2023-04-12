import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import * as photovoltaicGenerationsService from '../../services/PhotovoltaicGeneration';

function GeneratedEnergyPage() {

  const { auth, expiredToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPhotovoltaicGenerationsFound, setTotalEnergyConsumptionsFound] = useState(12);
  const [photovoltaicGenerations, setPhotovoltaicGenerations] = useState();
  const [count, setCount] = useState(1);
 
  //Delete photovoltaic generation register
  const deletePhotovoltaicGeneration = (id) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar el comentario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        photovoltaicGenerationsService.deletePhotovoltaicGeneration(id, auth.token);
        setCount(count + 1);
        Swal.fire({
          title: 'El producto fue eliminado con exito',
          icon: 'info'
        });
      } else {
        Swal.fire({
          title: 'El producto no fue eliminado',
          icon: 'info'
        });
      }
    });
    console.log(count);
  }

  useEffect(() => {
    const getEnergyConsumptions = async () => {
      let params = {
        page: currentPage
      };
      for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        params[param] = value;
      }
      try {
        const photovoltaicGenerationsResponse = await photovoltaicGenerationsService.getPhotovoltaicGenerations(auth.token, params);
        const photovoltaicGenerationsFromResponse = photovoltaicGenerationsResponse.data.data.photovoltaicGenerations;
        const totalPhotovoltaicGenerationsFromResponse = photovoltaicGenerationsResponse.data.results;

        //Validate pagination, avoid searching by page: 211 for example.
        if ((photovoltaicGenerationsFromResponse.length === 0 && totalPhotovoltaicGenerationsFromResponse !== 0) || params.page === '031') {
          handlePageChange({ selected: 0 });
          return;
        }
        //Otherwise, if there are results and everything ok, save data.
        setPhotovoltaicGenerations(photovoltaicGenerationsFromResponse);
        setTotalEnergyConsumptionsFound(totalPhotovoltaicGenerationsFromResponse);
      } catch (error) {
        if (error.response && error.response.data.status === 401) {
          expiredToken();
          navigate('/login');
        } else if (error.response && error.response.data.status === 400) Swal.fire('Error', error.response.data.error, 'error');
        else Swal.fire('Error', 'Algo ha salido mal, intenta de nuevo.' + error, 'error');
      }
    };
    getEnergyConsumptions();
  }, [location]);

  const handlePageChange = (data) => {
    //set new current page.
    setCurrentPage(data.selected + 1);

    navigate({
      pathname: '/administrador/manipularDatos/energiaGenerada',
      search: location.search !== '' ? location.search.replace(/page=\d+/, `page=${data.selected + 1}`) : `page=${data.selected + 1}`
      //`${location.search !== '' ? location.search + '&' : `page=${data.selected+1}`}`
    });

    window.scrollTo(0, 0);
  };

  return (
    <section className="container mt-3">
      <div className="table-responsive">
        <div className="table-wrapper">

          <div className="table-title mb-3">
            <div className="row">
              <div className="col-sm-6">
                <h2>Administrar <b>energia generada</b></h2>
              </div>
              <div className="col-sm-6 d-flex m-auto justify-content-end">
                <a href="/" className="btn btn-success me-1" data-toggle="modal"><i className="fa-solid fa-plus"></i> <span>Añadir registro</span></a>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">

            <thead>
              <tr>
                <th>Fecha</th>
                <th>Kw/hr</th>
                <th>wr</th>
                <th>Edificio</th>
                <td>Acciones</td>
              </tr>
            </thead>

            <tbody>
              {
                photovoltaicGenerations ? photovoltaicGenerations.map((photovoltaicGeneration) => {
                  // return <PhotovoltaicGenerationRow key={index} photovoltaicGeneration={photovoltaicGeneration} />
                  return(
                  <tr key={photovoltaicGeneration._id}>
                  {
                    photovoltaicGeneration &&
                    <>
                      <td>{new Date(photovoltaicGeneration.createdAt).toLocaleString('es-MX')}</td>
                      <td>{photovoltaicGeneration.kwhr}</td>
                      <td>{photovoltaicGeneration.wr}</td>
                      <td>{photovoltaicGeneration.building.name}</td>
                      <td>
                        <button onClick={() => deletePhotovoltaicGeneration(photovoltaicGeneration._id)} className="btn btn-danger mx-2">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </>
                  }
                </tr>
                )})
                  :
                  <tr>
                    <td>Aun no consumos energeticos que mostrar</td>
                  </tr>
              }
            </tbody>

          </table>

          <ReactPaginate
            previousLabel={<i className="fa-solid fa-left-long"></i>}
            nextLabel={<i className="fa-solid fa-arrow-right-long"></i>}
            breakLabel='...'
            pageCount={Math.ceil(totalPhotovoltaicGenerationsFound / 12)}
            marginPagesDisplayed='1'
            pageRangeDisplayed='3'
            onPageChange={handlePageChange}
            containerClassName='pagination justify-content-center'
            pageClassName='page-item'
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            previousClassName="page-item"
            nextLinkClassName="page-link"
            nextClassName="page-item"
            breakLinkClassName="page-link"
            breakClassName="page-item"
            activeClassName="active"
          />

        </div>
      </div>
    </section>
  );
}

export default GeneratedEnergyPage;