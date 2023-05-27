const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const { shouldSupportInterfaces } = require('../utils/introspection/SupportsInterface.behavior');

const ERC721ReceiverMock = artifacts.require('ERC721ReceiverMock');

const Error = ['None', 'RevertWithMessage', 'RevertWithoutMessage', 'Panic']
    .reduce((acc, entry, idx) => Object.assign({ [entry]: idx }, acc), {});

const many = new BN('100');
const one = new BN('1');

const baseURI = 'https://api.example.com/v1/';

const RECEIVER_MAGIC_VALUE = '0x150b7a02';

function shouldBehaveLikeERC721ABatch(supplyCap, txLimit, baseTokenId, owner, newOwner, approved, anotherApproved, operator, other) {
    const firstTokenId = baseTokenId.add(one);
    const lastTokenId = baseTokenId.add(many);
    const endTokenId = baseTokenId.add(supplyCap);

    describe('mintBatch(address, uint256)', function () {
        it('reverts with a null destination address', async function () {
            await expectRevert.unspecified(
                this.token.mint(ZERO_ADDRESS, one),
            );
        });

        context('with minting a single token', async function () {
            beforeEach(async function () {
                (this.receipt = await this.token.mint(owner, one));
            });

            it('emits a Transfer event', function () {
                expectEvent(this.receipt, 'Transfer', { from: ZERO_ADDRESS, to: owner, tokenId: firstTokenId });
            });

            it('creates the token', async function () {
                expect(await this.token.balanceOf(owner)).to.be.bignumber.equal(one);
                expect(await this.token.ownerOf(firstTokenId)).to.equal(owner);
            });
        });

        context('with minting many tokens for owner', async function () {
            beforeEach(async function () {
                (this.receipt = await this.token.mint(owner, many));
            });

            it('updates the balanceOf to match number minted', async function () {
                expect(await this.token.balanceOf(owner)).to.be.bignumber.equal(many);
            });

            describe('for the first token', function () {
                it('emits a Transfer event', async function () {
                    expectEvent(this.receipt, 'Transfer',
                        { from: ZERO_ADDRESS, to: owner, tokenId: firstTokenId });
                });

                it('creates the token', async function () {
                    expect(await this.token.ownerOf(firstTokenId)).to.equal(owner);
                });
            });

            describe('for the last token', function () {
                it('emits a Transfer event', async function () {
                    expectEvent(this.receipt, 'Transfer',
                        { from: ZERO_ADDRESS, to: owner, tokenId: lastTokenId });
                });

                it('creates the token', async function () {
                    expect(await this.token.ownerOf(lastTokenId)).to.equal(owner);
                });
            });
        });

        context('with minting all tokens for owner', async function () {
            beforeEach(async function () {
                (this.receipt = await this.token.mint(owner, supplyCap));
            });

            it('updates the balanceOf to match number minted', async function () {
                expect(await this.token.balanceOf(owner)).to.be.bignumber.equal(supplyCap);
            });

            describe('for the end token', function () {
                it('emits a Transfer event', async function () {
                    expectEvent(this.receipt, 'Transfer',
                        { from: ZERO_ADDRESS, to: owner, tokenId: endTokenId });
                });

                it('creates the token', async function () {
                    expect(await this.token.ownerOf(endTokenId)).to.equal(owner);
                });
            });
        });
    });

}

module.exports = {
    shouldBehaveLikeERC721ABatch,
};