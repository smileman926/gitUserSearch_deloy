import { useState } from 'react'
import classes from './Search.module.scss'
import TextInput from '../TextInput/TextInput'
import Button from '../Button/Button'
import Alert from '../Alert/Alert'
import request from '../../api/request'

import GitHubLogo from '../../assets/images/GitHub_Logo.png'

const Search = ({ onDataLoad = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleFetchData = async (e) => {
    if (e && e.key !== 'Enter') return
    if (searchTerm.length > 0) {
      try {
        setStatus('loading')
        const requestParams = {
          searchTerm,
          perPage: 9,
          page: 1,
          sort: 'login',
        }
        const res = await request(requestParams)
        setStatus('resolved')
        setTimeout(() => {
          onDataLoad({ ...res, requestParams })
        }, 2000)
      } catch (e) {
        setStatus('rejected')
        setErrorMessage(e.message)
        console.log(e)
      }
    }
  }

  return (
    <section className={classes.search}>
      <div className={classes.content}>
        <img
          className={classes['github-logo']}
          src={GitHubLogo}
          alt="github logo"
        />
        <TextInput
          placeholder="Enter search term"
          className={classes['search-input']}
          value={searchTerm}
          onChange={(v) => setSearchTerm(v)}
          onKeyDown={handleFetchData}
        />
        <Button onClick={handleFetchData} loading={status === 'loading'}>
          Search
        </Button>
        {(status === 'resolved' || status === 'rejected') && (
          <Alert
            className={classes.alert}
            status={status === 'resolved' ? 'success' : 'error'}
          >
            {status === 'resolved' ? 'Data loaded successfully!' : errorMessage}
          </Alert>
        )}
      </div>
    </section>
  )
}

export default Search
