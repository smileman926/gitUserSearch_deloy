import { useState, useEffect } from 'react'
import classes from './Results.module.scss'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg'
import Pagination from '../Pagination/Pagination'
import Button from '../Button/Button'
import Loading from '../Loading/Loading'
import Toast from '../Toast/Toast'
import request from '../../api/request'

const Result = ({ data, goBack }) => {
  const totalPages = Math.ceil(data.total_count / data.requestParams.perPage)

  const [status, setStatus] = useState('idle')
  const [tableItems, setTableItems] = useState(data.items)
  const [sort, setSort] = useState(data.requestParams.sort)
  const [page, setPage] = useState(data.requestParams.page)
  const [paginationItems, setPaginationItems] = useState([])
  const [toast, setToast] = useState({
    active: false,
    message: '',
    status: 'success',
  })

  useEffect(() => {
    if (page > 0 && totalPages > 0) {
      const allPagination = Array.from(Array(totalPages), (e, i) => i + 1)
      let startPosition = 0

      if (page - allPagination[0] > 2) {
        startPosition = page - 3
      }

      if (allPagination[allPagination.length - 1] - startPosition > 5) {
        setPaginationItems(
          allPagination.slice(startPosition, startPosition + 5),
        )
      } else {
        if (allPagination.length >= 5) {
          setPaginationItems(allPagination.slice(allPagination.length - 5))
        } else {
          setPaginationItems([...allPagination])
        }
      }
    }
  }, [page, totalPages])

  const handleUpdateData = async (requestParams) => {
    try {
      setStatus('loading')
      const res = await request(requestParams)
      setTableItems(res.items)
      setPage(requestParams.page)
      setSort(requestParams.sort)
      setStatus('resolved')
    } catch (e) {
      setStatus('rejected')
      showMessage({ message: e.message, status: 'error' })
      console.log(e)
    }
  }

  const handleUpdateSorting = (sortingFactor) => {
    if (sort !== sortingFactor) {
      handleUpdateData({ ...data.requestParams, sort: sortingFactor, page })
    }
  }

  const handleUpdatePage = (pg) => {
    if (page !== pg) {
      if (typeof pg === 'number') {
        handleUpdateData({ ...data.requestParams, sort, page: pg })
      } else {
        if (pg === 'next') {
          if (page + 1 <= totalPages) {
            handleUpdateData({ ...data.requestParams, sort, page: page + 1 })
          }
        }
        if (pg === 'prev') {
          if (page - 1 >= 1) {
            handleUpdateData({ ...data.requestParams, sort, page: page - 1 })
          }
        }
      }
    }
  }

  const showMessage = ({ status, message }) => {
    setToast({ active: true, message, status })

    setTimeout(() => {
      setToast({ active: false, message, status })
    }, 4000)
  }

  return (
    <>
      <div className={classes.wrapper}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>
                <button
                  className={classes['table-header']}
                  onClick={() => handleUpdateSorting('avatar_url')}
                >
                  Avatar URL{' '}
                  {sort === 'avatar_url' && (
                    <ArrowIcon className={classes.icon} />
                  )}
                </button>
              </th>
              <th>
                <button
                  className={classes['table-header']}
                  onClick={() => handleUpdateSorting('login')}
                >
                  Login{' '}
                  {sort === 'login' && <ArrowIcon className={classes.icon} />}
                </button>
              </th>
              <th>
                <button
                  className={classes['table-header']}
                  onClick={() => handleUpdateSorting('type')}
                >
                  Type{' '}
                  {sort === 'type' && <ArrowIcon className={classes.icon} />}
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {tableItems &&
              tableItems.length > 0 &&
              tableItems.map((row) => (
                <tr key={row.id}>
                  <td>{row.avatar_url}</td>
                  <td>{row.login}</td>
                  <td>{row.type}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <Button small className={classes.button} onClick={goBack}>
          Back To Search
        </Button>
      </div>

      <Pagination
        items={paginationItems}
        onChange={handleUpdatePage}
        active={page}
        totalPages={totalPages}
      />

      <Loading active={status === 'loading'} />

      <Toast
        status={toast.status}
        active={toast.active}
        message={toast.message}
      />
    </>
  )
}

export default Result
