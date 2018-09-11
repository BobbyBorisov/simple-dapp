import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import * as types from './mutation-types'
import {StorageContract} from "../contracts"

Vue.use(Vuex)

const state = {
    account:'',
    name:'',
    age:''
}

const getters = {
    account: state => state.account,
    name: state => state.name,
    age: state => state.age == 0 ? '' : state.age
}

const actions = {
    initWeb3({dispatch}){
        if(typeof web3 !== 'undefined'){
            window.web3 = new Web3(web3.currentProvider)
            dispatch('watchWeb3Account')
            dispatch('setContractProvider')
        }
    },
    watchWeb3Account({commit, dispatch, state}){
        setInterval(async () => {
            const accounts = await web3.eth.getAccounts()
            const activeAccount = accounts[0]

            if(!activeAccount) return

            if(activeAccount !== state.account){
                commit(types.UPDATE_ACCOUNT, activeAccount)
                dispatch('getInitialData')
            }
        }, 500)
    },
    setContractProvider(){
      StorageContract.setProvider(web3.currentProvider)
    },
    setData(){
        StorageContract.deployed().then(async (instance) => {
            try{
                await instance.setData(state.name, state.age, {from: state.account})
                console.log('success')
            } catch (err){
                console.error(err)
            }
        })
    },
    getInitialData({commit, state}){
        StorageContract.deployed().then(async (instance) => {
            const [name, age] = await instance.getPersonData(state.account)
            commit(types.UPDATE_NAME, name)
            commit(types.UPDATE_AGE, age)
        })
    }
}

const mutations = {
    [types.UPDATE_ACCOUNT](state, account){
        state.account = account
    },
    [types.UPDATE_NAME](state, name){
        state.name = name
    },
    [types.UPDATE_AGE](state, age){
        state.age = age
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})