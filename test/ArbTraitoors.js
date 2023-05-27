const { BN, constants, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const {
    shouldBehaveLikeERC721,
    shouldBehaveLikeERC721Metadata,
    shouldBehaveLikeERC721Sequential,
    shouldBehaveLikeERC721Batch,
} = require('./ERC721/ERC721.errors.behavior');
const { expect } = require('chai');

const Token = artifacts.require('ArbiTraitoors');

const zero = new BN('0');
const one = new BN('1');
const two = one.add(one);
const ten = new BN('10');

contract('ArbiTraitoors', function (accounts) {
    const baseURI = ''
    const contractURI = ''
    const name = 'ArbiTraitoors';
    const symbol = 'TRTR';
    const maxSupply = new BN('360');    
    const initMint = new BN('0');  
    
    beforeEach(async function () {
        this.token = await Token.new(
            name, 
            symbol, 
            initMint,
            maxSupply,
            baseURI, 
            contractURI);        
    });

    shouldBehaveLikeERC721(...accounts);
    shouldBehaveLikeERC721Batch(maxSupply, one, ...accounts);
    shouldBehaveLikeERC721Metadata(name, symbol, ...accounts);
    shouldBehaveLikeERC721Sequential(maxSupply, one, ...accounts);    
    
});                 
