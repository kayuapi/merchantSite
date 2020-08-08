import { stringify } from 'query-string'
import { fetchUtils } from 'react-admin'
// import Cookies from 'universal-cookie'
import { v4 as uuidv4 } from 'uuid'

//import { store } from 'index'

const camelCaseKeys = require('camelcase-keys')

// const snakeCaseKeys = require('snakecase-keys')

// const cookies = new Cookies()



const fetchJson = (url, options = {}) => {
  //const fullUrl = `${window.baseUrl}/api/${url}`
  const fullUrl = `https://demo.api.chmbox.tech/${url}`
  // const fullUrl = `https://patio.api.chmbox.tech/${url}`
  // const fullUrl = `http://ec2-52-220-135-57.ap-southeast-1.compute.amazonaws.com:8001/${url}`
  // // const fullUrl = `https://newguoba.api.chmbox.tech/${url}`
  // const fullUrl = `http://127.0.0.1:8000/${url}`
  //const { access } = store.getState().auth
  // const cookie = cookies.get('csrftoken')

  // // Convert keys to snake case (to comply with backend spec) and serialize body to json
  // if (options.body) {
  //   // eslint-disable-next-line no-param-reassign
  //   options.body = JSON.stringify(camelCaseKeys(options.body, { deep: true }))
  // }
  if (!options.headers) {
    // eslint-disable-next-line no-param-reassign
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Token ${token}`);
  options.headers.set('origin', `*`)
  // console.log('options');
  // console.log(options);
  // Inject the Authorization header from the redux store, if there is one
//  if (access) {
//    options.headers.set('Authorization', `JWT ${access.token}`)
//  }

  // Inject the CSRF token, if there is one
  //if (cookie) {
  //  console.log(`${cookie}`)
  //  options.headers.set('X-CSRFToken', `${cookie}`)
  //}
  // add your own headers here
  // options.headers.set('X-Custom-Header', 'foobar')
  return fetchUtils.fetchJson(fullUrl, options)
}


const getListFromResponse = response => {
  const { headers, json } = response
  if ('count' in json) {
    return { data: camelCaseKeys(json.results, { deep: true }), total: json.count }
  }
  if (headers.has('content-range')) {
    return {
      data: json,
      total: parseInt(
        headers
          .get('content-range')
          .split('/')
          .pop(),
        10,
      ),
    }
  }
  if ('detail' in json && json.detail === 'Invalid page.') {
    return { data: [], total: 0 }
  }
  throw new Error('The total number of results is unknown. The DRF data provider expects responses for lists of resources to contain this information to build the pagination. If you\'re not using the default PageNumberPagination class, please include this information using the Content-Range header OR a "count" key inside the response.')
}


/**
 * Maps react-admin queries to the default format of Django REST Framework
 */
export default {
  getList: (resource, params) => {
    const options = {}
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const { filter } = params
    const query = {
      page,
      page_size: perPage,
      ordering: `${order === 'ASC' ? '' : '-'}${field}`,
      ...filter,
    }
    const url = `${resource}/?${stringify(query)}`
    // console.log(url)
    // fetchJson(url, options).then(response => getListFromResponse(response)).then(res=>console.log(res));
    return fetchJson(url, options).then(response => getListFromResponse(response));
  },

  show: (resource) => {
    const options = {}
    const url = `${resource}`
    return fetchJson(url, options).then(response => {
      return { data: camelCaseKeys(response.json, { deep: true }) }
    })
  },


  getOne: (resource, params) => {
    // console.log('get ONe');
    const options = {}
    const url = `${resource}/${params.id}/`
    console.log(url)
    return fetchJson(url, options).then(response => {
      // console.log(response);
      // return { data: camelCaseKeys(response.json, { deep: true }) }
      return { data: response.json }
    })
  },
  getMany: (resource, params) => {
    // console.log('check many');
    const options = { method: 'GET' }
    return Promise.all(
      params.ids.map(id => fetchJson(`${resource}/${id}/`, options)),
    ).then(responses => {      
      // console.log('check getMany');
      // console.log(responses); 
    return({
      data: responses.map(response => camelCaseKeys(response.json, { deep: true })),
    })})
  },
  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const { filter, target, id } = params
    const query = {
      page,
      page_size: perPage,
      ordering: `${order === 'ASC' ? '' : '-'}${field}`,
      ...filter,
      [target]: id,
    }
    const url = `${resource}/?${stringify(query)}`
    const options = {}
    return fetchJson(url, options).then(response => getListFromResponse(response))
  },



  create: (resource, params) => {
    const url = `${resource}/`
    var options
    // console.log(params.data)
    // console.log(url)
    // console.log(params.data.image)

    if (params.data.image) {
      options = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'origin': '*',
        },
        method: 'POST'
      };
      // console.log('herehere')
      // console.log(options)

      //data = new FormData();
      //for (let key in params.data) {
      



      options.body = new FormData();
      // console.log('abc')
      // console.log(options)
      for (let key in params.data) {
        if (key === 'image') {
            // console.log('ghi')
            // console.log(options)
            // console.log(params.data.image.src)
//            options.body.append('image', params.data.image.rawFile, params.data.image.title);
            const imageUploadedTitle = params.data.image.title + '-' + uuidv4();
            options.body.append('file', params.data.image.rawFile, imageUploadedTitle);
        }
        else {
            // console.log('def')
            options.body.append(key, params.data[key]);
            
            // console.log(options)
        }
      };
      // console.log('fff')
      // console.log(options)
      // for (var pair of options.body.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]); 
      // }
    }
    else {
      options = {
        method: 'POST',
        body: JSON.stringify(params.data),
      };
    }

    // console.log('iiiiiii');
    // console.log(url)
    // console.log(options) 
    // console.log(options.body)    
    return fetchJson(url, {method: 'POST', body: options.body}).then(response => {
      // console.log('done')
      // console.log(response)
      // TODO review whether we need to update all data or just the ID
      //  return { data: camelCaseKeys(response.json, { deep: true }) }
      return { data: { ...params.data, id: response.json.id } }
    })
  },

  update: (resource, params) => {
    const url = `${resource}/${params.id}/`
    // console.log('investigate update');
    // console.log(url);
    const options = {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }
    return fetchJson(url, options).then(response => {
      return { data: camelCaseKeys(response.json, { deep: true }) }
    })
  },
  updateMany: (resource, params) => {
    return Promise.all(
      params.ids.map(id => fetchJson(`${resource}/${id}`, {
        method: 'PUT',
        body: params.data,
      })),
    ).then(responses => ({
      data: responses.map(response => camelCaseKeys(response.json, { deep: true })),
    }))
  },
  delete: (resource, params) => {
    const url = `${resource}/${params.id}/`
    const options = {
      method: 'DELETE',
    }
    return fetchJson(url, options).then(() => {
      // todo should this really be like this? or like the default
      //  return { data: response.json }
      return { data: params.previousData }
    })
  },
  deleteMany: (resource, params) => {
    // TODO can we check whether the viewsets need this customisation?
    //  Perhaps we can make a single query like the example in
    //  https://github.com/marmelab/react-admin/blob/v3.0.0-beta.0/docs/DataProviders.md
    return Promise.all(
      params.ids.map(id => fetchJson(`${resource}/${id}`, { method: 'DELETE' })),
    ).then(responses => ({
      data: responses.map(response => camelCaseKeys(response.json, { deep: true })),
    }))
  },
}

