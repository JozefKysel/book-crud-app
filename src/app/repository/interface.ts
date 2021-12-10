// TODO: this can be abstract class with implementation of each method
// since all these methods have a potential to be reused across specific repositories
export default interface Repository<T, P> {
    getAll(): Promise<T[]>;

    getOneById(id: string): Promise<T>;
    
    save(objectToSave: P): Promise<string>;

    deleteById(id: string): Promise<void>;
}