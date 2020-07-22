import { API, Auth } from 'aws-amplify';


export async function grabFromDb(item) {
  const uriEncodedItem = encodeURIComponent(item);

  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin/object';
  try {
    const myInit = {
      headers: {
        // 'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      response: false
    };

    const currentUserInfo = await Auth.currentUserInfo();
    const path = `${basePath}/${currentUserInfo.username}/${uriEncodedItem}`;
    const retrievedItem = await API.get(apiName, path, myInit);
    return retrievedItem;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

export async function savePanelToDb(items, category) {
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin';
  items.forEach(element => {
    element.uiLocation.x = Number(element.uiLocation.x);
    element.uiLocation.y = Number(element.uiLocation.y);
    element.uiLocation.w = Number(element.uiLocation.w);
    element.uiLocation.h = Number(element.uiLocation.h);
  });
  try {
    const myInit = {
      headers: {
        'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      body: {
        SK: `PluginMenu#${category}`, 
        items: items
      },
      response: false
    };  
    const path = `${basePath}`;
    const response = await API.post(apiName, path,  myInit);
    console.log('pageSubmissionResponse', response);
    return response;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

export async function saveCategoriesToDb(categories) {
  // const processedPageNames = pageNames.map(item=>item.value);
  const processedPageNames = categories.map(item=>item);
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin';
  try {
    const myInit = {
      headers: {
        'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      body: {
        SK: 'PluginMenuPages', 
        categories: processedPageNames
      },
      response: false
    };  
    const path = `${basePath}`;
    const response = await API.post(apiName, path,  myInit);
    return response;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

export async function saveCategoriesAndMenuItemsToDb(categories, currentCategoryName, menuItems) {
  const apiName = 'amplifyChmboxOrderingApi';
  const path = '/uiplugin/save';
  const myInit = {
    headers: {
      'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
    },
    body: {
      categories: {
        SK: 'PluginMenuPages',
        categories,
      },
      menuItems: {
        SK: `PluginMenu#${currentCategoryName}`, 
        menuItems,
      }
    },    
    response: false
  };  
  return await API.post(apiName, path,  myInit);
}

export async function deleteCategoriesAndMenuItemsFromDb(categories, deletingCategory) {
  const deletingCategoryName = deletingCategory.name;
  const updatedCategories = categories
    .filter(category => category.id !== deletingCategory.id)
    .map(category => ({
      id: category.id,
      name: category.name
    }));
  const apiName = 'amplifyChmboxOrderingApi';
  const path = '/uiplugin/delete';
  const myInit = {
    headers: {
      'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
    },
    body: {
      categories: {
        SK: 'PluginMenuPages',
        categories: updatedCategories,
      },
      deletedCategoryName: {
        SK: `PluginMenu#${deletingCategoryName}`,
      }
    },    
    response: false
  };  
  return await API.post(apiName, path,  myInit);
}



export async function deleteFromDb(item) {
  // const processedPageNames = pageNames.map(item=>item.value);
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin/object';
  try {
    const myInit = {
      headers: {
        'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      response: false
    };  
    const currentUserInfo = await Auth.currentUserInfo();
    const path = `${basePath}/${currentUserInfo.username}/${item}`;
    const response = await API.del(apiName, path,  myInit);
    return response;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}
