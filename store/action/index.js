import { AsyncStorage } from 'react-native';
import { useCallback } from 'react';


export function postLogin(payload) {
  const data = { telepon: payload.phoneNumber, password: payload.password };
  console.log(data, '=>>>>>>>>')
  return async (dispatch, getState) => {
    const url = 'https://tukangcukur.herokuapp.com/login/customer'
    const myRequest = new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    try {
      await fetch(myRequest)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data)
          dispatch({
            type: "SET_ACCESS_TOKEN",
            payload: {
              access_token: data.accesToken
            }
          })
          return data

        })
        .then((data) => {
          (AsyncStorage.setItem("access_token", data.access_token, function (err) {
            if (err) console.log(err)
            else {
              console.log('success set token ')
            }
          }))
        })

        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (err) {
      console.log(err)
    }


  }
}

export function postRegister(payload) {
  const data = { telepon: payload.phoneNumber, password: payload.password, nama:payload.name, alamat:payload.address };
  console.log(data, '=>>>>>>>>')
  return (dispatch, getState) => {
    const url = 'https://tukangcukur.herokuapp.com/customer/'
    const myRequest = new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    fetch(myRequest)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, "\n Berhasil Register")
      })
      .catch((error) => {
        console.log('Ciluk ba')
        console.error('Error:', error);
      });
  }
}

export function getOngoingTransaction(payload) {
  return (dispatch, getState) => {
    // console.log('on going transaction')

    const url = 'https://tukangcukur.herokuapp.com/transaksi/ongoing'
    const myRequest = new Request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access_token':payload
      }
    });
    fetch(myRequest)
      .then(response => response.json())
      .then(myBlob => {
        // console.log(myBlob,'disini')
        dispatch({
          type: 'SET_ONGOING_TRANSACTION',
          payload: myBlob
        })
      })
      .catch(console.log)
  }
}

export async function postTransactionCustom(payload) {
  const data = { customerLatitude: payload.customerLatitude, customerLongitude: payload.customerLongitude, servis: payload.servis}
  console.log(data,'data cuy')
  return (dispatch, getState) => {
    const url = 'https://tukangcukur.herokuapp.com/transaksi/'
    const myRequest = new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token':payload.access_token
      },
      body: JSON.stringify(data)
    });
    fetch(myRequest)
      .then((resp) => resp.json())
      .then((data) =>{
        // dispatch()
      })
      .catch(console.log)
  }
}




