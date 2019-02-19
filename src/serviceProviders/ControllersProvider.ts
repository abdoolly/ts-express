import { sync as globSync } from 'glob';

export class ControllerProvider {

    /**
     * controllers place relative from this place
     */
    constrollersDirectory = './src/controllers/';
    controllersExtension = '.ts';

    provide() {
        /**
         * MAIN PURPOSE make the controllers object mappers
         * 
         * - read all controllers
         * - remove extensions
         * - 
         * - split on 
         * - make there names as object mappers
         */
        let controllers = globSync(`${this.constrollersDirectory}/**/**.ts`);

        this.doPathOperations(controllers);
        // controllers = controllers.map(this.removeExtensionsInFilePath.bind(this));
        // controllers = controllers.map(this.removeDirectoryPathFromControllerPath.bind(this));

        // remove the extensions then make a copy
        // then continue 


        // console.log('controllers', controllers);
    }

    doPathOperations(controllerPaths: string[]) {
        let fullPathWithoutExtension = [];
        let controllerMapper = {};

        for (let path of controllerPaths) {
            // remove path from path
            path = this.removeExtensionsInFilePath(path);

            // push to the full array path
            fullPathWithoutExtension.push(path);

            // make the controller mapper property name 
            let mapperProperty = this.removeDirectoryPathFromControllerPath(path);

            // getting the controller module
            // we need to check if the controller exists
            // if the controller does not exist we need to say 
            controllerMapper[mapperProperty] = this.makeMapperPropertyValue(path);

        }
    }

    /**
     * @description get a file path and remove the extension .ts extension
     * @param filePath 
     */
    removeExtensionsInFilePath(filePath: string) {
        let removeDotSlash = new RegExp(/\.\//);
        let removeExtension = new RegExp(`${this.controllersExtension}`);
        return filePath.replace(removeExtension, '').replace(removeDotSlash, '');
    }

    /**
     * @description remove the ./ and the main directory path from the controllers paths
     * @param filePath 
     */
    removeDirectoryPathFromControllerPath(filePath: string) {

        // removing the dot from the directory name
        let removeDotSlash = new RegExp(/\.\//);
        let directory = this.constrollersDirectory.replace(removeDotSlash, '');

        let removeDirectoryPath = new RegExp(`${directory}`);
        // removing the main directory name from the controllers paths 
        // and removing the ./ from the path if they exist 
        return filePath.replace(removeDirectoryPath, '');
    }

    /**
     * @description make a new object from the controller and return it 
     * to be put in the controllers mapper object 
     * @param filePath 
     */
    makeMapperPropertyValue(filePath: string) {

        // statically remove the src folder
        // 

        // let controller = require(`${filePath}`);
        let splitted = filePath.split('/');
        let controllerName = splitted[splitted.length - 1];
        // console.log('controllerName', controllerName);

        // console.log('filePath', filePath);
        // console.log('choosen Path', `${filePath}/${controllerName}`);

        // let controller = require(`../src/controllers/`);
        let controller = {};
        // controller['x']['y'];
        // console.log('controller value', controller[controllerName]);
        // console.log('------------');
    }

}

/**
 * @description we run that provider here to generate the controller object mapper 
 * and cache the result so its not recalculated again
 */
export let controllersMapper = new ControllerProvider().provide();