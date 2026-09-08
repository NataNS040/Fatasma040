interface Window {
    engmarqAccess: {
        canAccess(role: string, path: string): boolean;
        labels: Record<string, string>;
        guard(path?: string): boolean;
    };
}
