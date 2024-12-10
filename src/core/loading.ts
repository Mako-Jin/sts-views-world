import {ParallelWorld} from "./world";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export class LoadingTrackerEntry {
    public path: string;
    public progress: number = 0;
    public finished: boolean = false;

    constructor(path: string) {
        this.path = path;
    }
}


export class LoadingManager {

    public onFinishedCallback: () => void;

    private world: ParallelWorld;
    private gltfLoader: GLTFLoader;

    private loadingTracker: LoadingTrackerEntry[] = [];

    constructor(world: ParallelWorld) {
        this.world = world;
        this.gltfLoader = new GLTFLoader();

        this.world.setTimeScale(0);
    }

    public loadGLTF(path: string, onLoadingFinished: (gltf: any) => void): void {
        let trackerEntry = this.addLoadingEntry(path);
        this.gltfLoader.load(path,
            (gltf)  => {
                onLoadingFinished(gltf);
                this.doneLoading(trackerEntry);
            },
            (xhr) => {
                if (xhr.lengthComputable ) {
                    trackerEntry.progress = xhr.loaded / xhr.total;
                }
            },
            (error)  => {
                console.error(error);
            });
    }

    public addLoadingEntry(path: string): LoadingTrackerEntry {
        let entry = new LoadingTrackerEntry(path);
        this.loadingTracker.push(entry);

        return entry;
    }

    public doneLoading(trackerEntry: LoadingTrackerEntry): void {
        trackerEntry.finished = true;
        trackerEntry.progress = 1;

        if (this.isLoadingDone()) {
            if (this.onFinishedCallback !== undefined) {
                this.onFinishedCallback();
            } else {
                // UIManager.setUserInterfaceVisible(true);
            }

            // UIManager.setLoadingScreenVisible(false);
        }
    }

    private isLoadingDone(): boolean {
        for (const entry of this.loadingTracker) {
            if (!entry.finished) return false;
        }
        return true;
    }
    
}
