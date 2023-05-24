const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const { shouldSupportInterfaces } = require('../utils/introspection/SupportsInterface.behavior');

const Error = ['None', 'RevertWithMessage', 'RevertWithoutMessage', 'Panic']
    .reduce((acc, entry, idx) => Object.assign({ [entry]: idx }, acc), {});

const zero = new BN('0');
const one = new BN('1');
const two = new BN('2');

function shouldBehaveLikeERC721Sequential(supplyCap, baseTokenId, owner) {
    const startTokenId = baseTokenId.add(one);
    const endTokenId = baseTokenId.add(supplyCap);

    describe('with token id limits', function () {
        it('has a supply cap equal to value passed into constructor', async function () {
            expect(await this.token.supplyCap()).to.be.bignumber.equal(supplyCap);
        });

        it('has a start token id equal to 1+base token id passed into constructor', async function () {
            expect(await this.token.startTokenId()).to.be.bignumber.equal(startTokenId);
        });

        it('has an ending token id equal to start token id + supply cap', async function () {
            expect(await this.token.endTokenId()).to.be.bignumber.equal(endTokenId);
        });
        
        describe('at initial state', function () {
            it('has 0 total supply', async function() {
                expect(await this.token.totalSupply()).to.be.bignumber.equal(zero);
            });
            it('has a remaining supply equal to the supply cap', async function () {
                expect(await this.token.remainingSupply()).to.be.bignumber.equal(supplyCap);
            });
            it('the next mint is valid', async function () {
                expect(await this.token.isNextMintValid()).to.be.equal(true);
            });
            it('the next token id is start token id', async function () {
                expect(await this.token.nextTokenId()).to.be.bignumber.equal(startTokenId);
            });
        });
        describe('after first mint', function() {
            beforeEach(async function() {                
                await this.token.mintTo(owner);
            });
            it('has 1 total supply', async function () {
                expect(await this.token.totalSupply()).to.be.bignumber.equal(one);
            });
            it('has a remaining supply equal to the supply cap-1', async function () {
                expect(await this.token.remainingSupply()).to.be.bignumber.equal(supplyCap.sub(one));
            });
            it('the next mint is valid', async function () {
                expect(await this.token.isNextMintValid()).to.be.equal(true);
            });
            it('the next token id is start token id +1', async function () {
                expect(await this.token.nextTokenId()).to.be.bignumber.equal(startTokenId.add(one));
            });
        });
        describe('after supply cap number of mints', function () {
            beforeEach(async function () {
                if (this.token.batchMint === undefined) {
                    for (var i = 0; i < supplyCap; i++) {
                        await this.token.mintTo(owner);
                    }                    
                } else {
                    await this.token.batchMint(owner, supplyCap);
                }
                
            });
            it('has a total supply equal to supply cap', async function () {
                expect(await this.token.totalSupply()).to.be.bignumber.equal(supplyCap);
            });
            it('has a remaining supply equal to 0', async function () {
                expect(await this.token.remainingSupply()).to.be.bignumber.equal(zero);
            });
            it('the next mint is not valid', async function () {
                expect(await this.token.isNextMintValid()).to.be.equal(false);
            });
            it('the next token id is end token id + 1', async function () {
                expect(await this.token.nextTokenId()).to.be.bignumber.equal(endTokenId.add(one));
            });
        });
    });
}

module.exports = {
    shouldBehaveLikeERC721Sequential,
};