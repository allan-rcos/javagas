'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="custom-logo" data-src="images/logo.png">
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/BlankLayoutComponent.html" data-type="entity-link" >BlankLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DefaultLayoutComponent.html" data-type="entity-link" >DefaultLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FieldComponent.html" data-type="entity-link" >FieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormLayoutComponent.html" data-type="entity-link" >FormLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HelloPage.html" data-type="entity-link" >HelloPage</a>
                            </li>
                            <li class="link">
                                <a href="components/ImageCardButtonComponent.html" data-type="entity-link" >ImageCardButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginPage.html" data-type="entity-link" >LoginPage</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterCandidatePage.html" data-type="entity-link" >RegisterCandidatePage</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterChoicePage.html" data-type="entity-link" >RegisterChoicePage</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterCompanyPage.html" data-type="entity-link" >RegisterCompanyPage</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterUserPageComponent.html" data-type="entity-link" >RegisterUserPageComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/HttpService.html" data-type="entity-link" >HttpService</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalStorageItemService.html" data-type="entity-link" >LocalStorageItemService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CandidateService.html" data-type="entity-link" >CandidateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanyService.html" data-type="entity-link" >CompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelloService.html" data-type="entity-link" >HelloService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndustryService.html" data-type="entity-link" >IndustryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisterService.html" data-type="entity-link" >RegisterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StringService.html" data-type="entity-link" >StringService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FieldOptions.html" data-type="entity-link" >FieldOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormMessageOptions.html" data-type="entity-link" >FormMessageOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFormService.html" data-type="entity-link" >IFormService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetAllHttpService.html" data-type="entity-link" >IGetAllHttpService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetHttpService.html" data-type="entity-link" >IGetHttpService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHasLocalStorage.html" data-type="entity-link" >IHasLocalStorage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHttpService.html" data-type="entity-link" >IHttpService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILocalStorageItemService.html" data-type="entity-link" >ILocalStorageItemService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILoginHttpService.html" data-type="entity-link" >ILoginHttpService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegisterHttpService.html" data-type="entity-link" >IRegisterHttpService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRequest.html" data-type="entity-link" >LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageResponse.html" data-type="entity-link" >MessageResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterCandidateRequest.html" data-type="entity-link" >RegisterCandidateRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterCompanyRequest.html" data-type="entity-link" >RegisterCompanyRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterRequest.html" data-type="entity-link" >RegisterRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectOption.html" data-type="entity-link" >SelectOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenResponse.html" data-type="entity-link" >TokenResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});