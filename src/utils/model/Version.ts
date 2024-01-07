import { appVersionMajor, appVersionMinor, appVersionPatch } from "../../../config";

export type Version = {
  major: number;
  minor: number;
  patch: number;
  update: string;
};

export const currentVersion: Version = {
  major: appVersionMajor,
  minor: appVersionMinor,
  patch: appVersionPatch,
  update: "",
};

export function latestVersion(versions: Version[]): Version {
  let latest = versions[0];
  for (let i = 1; i < versions.length; i++) {
    if (compareVersion(versions[i] as Version, latest as Version) > 0) {
      latest = versions[i];
    }
  }
  return latest as Version;
}

export function compareVersion(v1: Version, v2: Version): number {
  if (v1.major > v2.major) {
    return 1;
  } else if (v1.major < v2.major) {
    return -1;
  } else {
    if (v1.minor > v2.minor) {
      return 1;
    } else if (v1.minor < v2.minor) {
      return -1;
    } else {
      if (v1.patch > v2.patch) {
        return 1;
      } else if (v1.patch < v2.patch) {
        return -1;
      } else {
        return 0;
      }
    }
  }
}
