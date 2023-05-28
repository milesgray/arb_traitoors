const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const { shouldSupportInterfaces } = require('../utils/introspection/SupportsInterface.behavior');

const ERC721ReceiverMock = artifacts.require('ERC721ReceiverMock');

const Error = ['None', 'RevertWithMessage', 'RevertWithoutMessage', 'Panic']
    .reduce((acc, entry, idx) => Object.assign({ [entry]: idx }, acc), {});

const firstTokenId = new BN('1');
const secondTokenId = new BN('2');
const nonExistentTokenId = new BN('13');
const thirdTokenId = new BN('3');
const fourthTokenId = new BN('4');
const baseURI = 'https://api.example.com/v1/';

const RECEIVER_MAGIC_VALUE = '0x150b7a02';

function shouldBehaveLikeERC721Enumerable(errorPrefix, owner, newOwner, approved, anotherApproved, operator, other) {
    shouldSupportInterfaces([
        'ERC721Enumerable',
    ]);

    context('with minted tokens', function () {
        beforeEach(async function () {
            await this.token.mint(owner);
            await this.token.mint(owner);
            this.toWhom = other; // default to other for toWhom in context-dependent tests
        });

        describe('totalSupply', function () {
            it('returns total token supply', async function () {
                expect(await this.token.totalSupply()).to.be.bignumber.equal('2');
            });
        });

        describe('tokenOfOwnerByIndex', function () {
            describe('when the given index is lower than the amount of tokens owned by the given address', function () {
                it('returns the token ID placed at the given index', async function () {
                    expect(await this.token.tokenOfOwnerByIndex(owner, 0)).to.be.bignumber.equal(firstTokenId);
                });
            });

            describe('when the index is greater than or equal to the total tokens owned by the given address', function () {
                it('reverts', async function () {
                    await expectRevert(
                        this.token.tokenOfOwnerByIndex(owner, 2), 
                        'ERC721Enumerable: owner index out of bounds',
                    );
                });
            });

            describe('when the given address does not own any token', function () {
                it('reverts', async function () {
                    await expectRevert(
                        this.token.tokenOfOwnerByIndex(other, 0), 
                        'ERC721Enumerable: owner index out of bounds',
                    );
                });
            });

            describe('after transferring all tokens to another user', function () {
                beforeEach(async function () {
                    await this.token.transferFrom(owner, other, firstTokenId, { from: owner });
                    await this.token.transferFrom(owner, other, secondTokenId, { from: owner });
                });

                it('returns correct token IDs for target', async function () {
                    expect(await this.token.balanceOf(other)).to.be.bignumber.equal('2');
                    const tokensListed = await Promise.all(
                        [0, 1].map(i => this.token.tokenOfOwnerByIndex(other, i)),
                    );
                    expect(tokensListed.map(t => t.toNumber())).to.have.members([firstTokenId.toNumber(),
                    secondTokenId.toNumber()]);
                });

                it('returns empty collection for original owner', async function () {
                    expect(await this.token.balanceOf(owner)).to.be.bignumber.equal('0');
                    await expectRevert(
                        this.token.tokenOfOwnerByIndex(owner, 0), 
                        'ERC721Enumerable: owner index out of bounds',
                    );
                });
            });
        });

        describe('tokenByIndex', function () {
            it('returns all tokens', async function () {
                const tokensListed = await Promise.all(
                    [0, 1].map(i => this.token.tokenByIndex(i)),
                );
                expect(tokensListed.map(t => t.toNumber())).to.have.members([firstTokenId.toNumber(),
                secondTokenId.toNumber()]);
            });

            it('reverts if index is greater than supply', async function () {
                await expectRevert(
                    this.token.tokenByIndex(2), 
                    'ERC721Enumerable: global index out of bounds',
                );
            });

            [firstTokenId, secondTokenId].forEach(function (tokenId) {
                it(`returns all tokens after burning token ${tokenId} and minting new tokens`, async function () {
                    const newTokenId = new BN(300);
                    const anotherNewTokenId = new BN(400);

                    await this.token.burn(tokenId);
                    await this.token.mint(newOwner);
                    await this.token.mint(newOwner);

                    expect(await this.token.totalSupply()).to.be.bignumber.equal('3');

                    const tokensListed = await Promise.all(
                        [0, 1, 2].map(i => this.token.tokenByIndex(i)),
                    );
                    const expectedTokens = [firstTokenId, secondTokenId, newTokenId, anotherNewTokenId].filter(
                        x => (x !== tokenId),
                    );
                    expect(tokensListed.map(t => t.toNumber())).to.have.members(expectedTokens.map(t => t.toNumber()));
                });
            });
        });
    });

    describe('_mint(address, uint256)', function () {
        it('reverts with a null destination address', async function () {
            await expectRevert(
                this.token.mint(ZERO_ADDRESS), 
                'ERC721: mint to the zero address',
            );
        });

        context('with minted token', async function () {
            beforeEach(async function () {
                (this.receipt = await this.token.mint(owner));
            });

            it('adjusts owner tokens by index', async function () {
                expect(await this.token.tokenOfOwnerByIndex(owner, 0)).to.be.bignumber.equal(firstTokenId);
            });

            it('adjusts all tokens list', async function () {
                expect(await this.token.tokenByIndex(0)).to.be.bignumber.equal(firstTokenId);
            });
        });
    });

    describe('_burn', function () {
        it('reverts when burning a non-existent token id', async function () {
            await expectRevert(
                this.token.burn(firstTokenId), 'ERC721: invalid token ID',
            );
        });

        context('with minted tokens', function () {
            beforeEach(async function () {
                await this.token.mint(owner);
                await this.token.mint(owner);
            });

            context('with burnt token', function () {
                beforeEach(async function () {
                    (this.receipt = await this.token.burn(firstTokenId));
                });

                it('removes that token from the token list of the owner', async function () {
                    expect(await this.token.tokenOfOwnerByIndex(owner, 0)).to.be.bignumber.equal(secondTokenId);
                });

                it('adjusts all tokens list', async function () {
                    expect(await this.token.tokenByIndex(0)).to.be.bignumber.equal(secondTokenId);
                });

                it('burns all tokens', async function () {
                    await this.token.burn(secondTokenId, { from: owner });
                    expect(await this.token.totalSupply()).to.be.bignumber.equal('0');
                    await expectRevert(
                        this.token.tokenByIndex(0),
                        'ERC721Enumerable: global index out of bounds',
                    );
                });
            });
        });
    });
}

function shouldBehaveLikeERC721Metadata(errorPrefix, name, symbol, owner) {
    shouldSupportInterfaces([
        'ERC721Metadata',
    ]);

    describe('metadata', function () {
        it('has a name', async function () {
            expect(await this.token.name()).to.be.equal(name);
        });

        it('has a symbol', async function () {
            expect(await this.token.symbol()).to.be.equal(symbol);
        });

        describe('token URI', function () {
            beforeEach(async function () {
                await this.token.mint(owner);
            });

            it('return empty string by default', async function () {
                expect(await this.token.tokenURI(firstTokenId)).to.be.equal('');
            });

            it('reverts when queried for non existent token id', async function () {
                await expectRevert(
                    this.token.tokenURI(nonExistentTokenId), 'ERC721: invalid token ID',
                );
            });

            describe('base URI', function () {
                beforeEach(function () {
                    if (this.token.setBaseURI === undefined) {
                        this.skip();
                    }
                });

                it('base URI can be set', async function () {
                    await this.token.setBaseURI(baseURI);
                    expect(await this.token.baseURI()).to.equal(baseURI);
                });

                it('base URI is added as a prefix to the token URI', async function () {
                    await this.token.setBaseURI(baseURI);
                    expect(await this.token.tokenURI(firstTokenId)).to.be.equal(baseURI + firstTokenId.toString());
                });

                it('token URI can be changed by changing the base URI', async function () {
                    await this.token.setBaseURI(baseURI);
                    const newBaseURI = 'https://api.example.com/v2/';
                    await this.token.setBaseURI(newBaseURI);
                    expect(await this.token.tokenURI(firstTokenId)).to.be.equal(newBaseURI + firstTokenId.toString());
                });
            });
        });
    });
}

module.exports = {
    shouldBehaveLikeERC721,
    shouldBehaveLikeERC721Enumerable,
    shouldBehaveLikeERC721Metadata,
};