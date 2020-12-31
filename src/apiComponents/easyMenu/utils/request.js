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

    // const currentUserInfo = await Auth.currentUserInfo();
    const currentUserInfo = await Auth.currentAuthenticatedUser();
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
  const toSubmitCategories = categories.map(({_newlyAdded, ...categoryAttribute}) => categoryAttribute);
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin';
  try {
    const myInit = {
      headers: {
        'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      body: {
        SK: 'PluginMenuPages', 
        categories: toSubmitCategories,
      },
      response: false
    };
    const path = `${basePath}`;
    return await API.post(apiName, path,  myInit);
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

export async function saveCategoriesAndMenuItemsToDb(categories, currentCategory, menuItems) {
  const toSubmitCategories = categories.map(({_newlyAdded, ...categoryAttribute}) => categoryAttribute);
  const {_newlyAdded, ...toSubmitCurrentCategory } = currentCategory;

  const foundIndex = toSubmitCategories.findIndex(({ id }) => id === toSubmitCurrentCategory.id);
  if (foundIndex !== -1) {
    toSubmitCategories[foundIndex] = toSubmitCurrentCategory;
  } else {
    toSubmitCategories.push(toSubmitCurrentCategory);
  }
  const apiName = 'amplifyChmboxOrderingApi';
  const path = '/uiplugin/save';
  const myInit = {
    headers: {
      'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
    },
    body: {
      categories: {
        SK: 'PluginMenuPages',
        categories: toSubmitCategories,
      },
      menuItems: {
        SK: `PluginMenu#${toSubmitCurrentCategory.pageId}`, 
        menuItems,
        categoryName: toSubmitCurrentCategory.name,
      }
    },    
    response: false
  };  
  return await API.post(apiName, path,  myInit);
}

export async function unpublishCategoriesToDb(categories, toUnpublishCategory) {
  const updatedCategories = categories
    .filter(category => category.id !== toUnpublishCategory.id)
    .map(({_newlyAdded, ...categoryAttribute}) => categoryAttribute);
  const toSubmitUnpublishedCategory = {
    id: toUnpublishCategory.id,
    name: toUnpublishCategory.name,
    pageId: toUnpublishCategory.pageId,
  }
  const apiName = 'amplifyChmboxOrderingApi';
  const path = '/uiplugin/unpublish';
  const myInit = {
    headers: {
      'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
    },
    body: {
      categories: updatedCategories,
      unpublishedCategory: toSubmitUnpublishedCategory,
    },    
    response: false
  };  
  return await API.post(apiName, path,  myInit);
}

export async function deleteCategoriesAndMenuItemsFromDb(categories, deletingCategory) {
  const deletingCategoryPageId = deletingCategory.pageId;
  const updatedCategories = categories
    .filter(category => category.id !== deletingCategory.id)
    .map(({_newlyAdded, ...categoryAttribute}) => categoryAttribute);
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
        SK: `PluginMenu#${deletingCategoryPageId}`,
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
    // const currentUserInfo = await Auth.currentUserInfo();
    const currentUserInfo = await Auth.currentAuthenticatedUser();
    const path = `${basePath}/${currentUserInfo.username}/${item}`;
    const response = await API.del(apiName, path,  myInit);
    return response;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}
