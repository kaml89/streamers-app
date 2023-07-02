import { AppDataSource } from "../data-source";
import { DataSource } from "typeorm";

class DbService {
    private count = 0;

    // constructor() {
    //     this.connect();
    // }

    public connect = async () => {
      if(AppDataSource.isInitialized) {
        return;
      }
      await AppDataSource.initialize()
        .then(() => {
          console.log(`Database connected in ${process.env.NODE_ENV} mode`)
        })
    }

    // getDataSource = (delay = 3000): Promise<DataSource> => {
    //   if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);
    
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       if (AppDataSource.isInitialized) resolve(AppDataSource);
    //       else reject("Failed to create connection with database");
    //     }, delay);
    //   });
    // };

}
export default new DbService();