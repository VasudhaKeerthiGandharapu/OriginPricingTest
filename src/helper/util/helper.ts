import { Page } from "@playwright/test";
const fs = require('fs')

import * as originPricingPage from '../../pages/originPricingPage'
import * as energyMadeEasyPage from '../../pages/energyMadeEasyPage'

const pages = {
    'Origin Pricing Page' : originPricingPage,
    'Energy MadeEasy Page' : energyMadeEasyPage
}

class Helper{
    private currentPage : string;
    private pages: Record<string, unknown>;
    constructor() {
        this.pages = pages;

    }

    async setCurrentPage(pageName) {
        console.log("setting currentPage to : "+ pageName);
        this.currentPage = pageName
    }

    async getCurrentPage() {
        if (this.currentPage == undefined){
           throw new Error("current page object not defined");
        }
        
        return this.currentPage;
    }
    async lookupElements(elements, elementName){
        let locator;
        try{
            locator = Object.values(elements).find((e) => e['elementName'] === elementName)['locator']
        } catch(e){
            throw new Error('Error while retreving locator from elemenetNme' + elementName)
        }
        if (locator === undefined){
            throw new Error(
                "No element locator found for '"+ elementName + "'for page'" + (await this.getCurrentPage())+"'" 
            );
        }
    }


    async getElementLocator(elementName){
        const currentPage = await this.getCurrentPage();
        let currentPageObject;
        try {
            currentPageObject = Object.values(this.pages).find((p) => p['name'] === currentPage);
        }catch(e){
            throw new Error('Error while retreving Page object using pageName' + currentPage)
        }
        if (currentPageObject === undefined)
            throw new Error(
                "Could not use pageObject using page name '"+ currentPage +"'" 
            );
        return this.lookupElements(currentPageObject['elments'], elementName)
    }

    async clickElement(elementName){
        console.log('clicking element with name --> ' + elementName);
        const locator = await this.getElementLocator(elementName);
        console.log('clicking element with name --> ' + locator);
    }
}

const helper = new Helper();
export { helper };