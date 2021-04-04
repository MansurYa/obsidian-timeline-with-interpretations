import type { TFile, MetadataCache, DataAdapter } from 'obsidian';
import { getAllTags } from 'obsidian';

export function FilterMDFiles(file: TFile, tagList: String[], metadataCache: MetadataCache) {

    if (tagList.contains("")) {
        if (tagList.length === 1) {
            tagList = null;
        } else {
            tagList = tagList.splice(tagList.indexOf(""), 1);
        }
    }

    if (!tagList) {
        return true;
    }

    let tags = getAllTags(metadataCache.getFileCache(file)).map(e => e.slice(1, e.length));

    if (tags && tags.length > 0) {
        return tagList.every(val => { return tags.indexOf(val as string) >= 0; });
    }

    return false;
}

/**
 * Create date of passed string
 * @date - string date in the format YYYY-MM-DD-HH
 */
export function createDate(date: string): Date {
    let dateComp = date.split(',');
    // cannot simply replace '-' as need to support negative years
    return new Date(+(dateComp[0] ?? 0), +(dateComp[1] ?? 0), +(dateComp[2] ?? 0), +(dateComp[3] ?? 0));
}

/**
 * Return URL for specified image path
 * @param path - image path
 */
export function getImgUrl(vaultAdaptor: DataAdapter, path: string): string {
    let regex = new RegExp('^https:\/\/');
    if (path.match(regex)) {
        return path;
    }

    return vaultAdaptor.getResourcePath(path);
}