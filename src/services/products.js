import { firestore } from '../constants/config';
import ProductDetail from '../pages/DetailPage/components/ProductDetail';

export const handleFetchProduct = () => {
    return new Promise((resolve, reject) => {
        firestore.collection('products')
                 .orderBy('pro_name')
                 .limit(24)
                 .get()
                 .then(product => {
                    //  const productArray = product.docs.map(doc => {
                    //      return {
                    //          id: doc.id,                            
                    //          ...doc.data(),                             
                    //      };
                    //  });
                     resolve(product.docs);
                 })
                 .catch(err => {
                     reject(err);
                 })
    });
}

export const getTotalProduct = async () => {
    try {
        const total = await firestore.doc('counters/products')
                                   .get()
                                   .then(doc => doc.get('count'));
        
        return total;
    } catch(err) {
        throw err;
    }
}

export const handlePaginateProduct = async ({snapshot = [], page, limit}) => {
    try {
        if(page === 1) {
            snapshot = 0;
        } else {
            snapshot = snapshot[snapshot.length - 1];
        }
        
        const productLimit = firestore.collection('products')
                                .orderBy('pro_name')
                                .startAfter(snapshot)
                                .limit(limit);
        const snapshotLimit = await productLimit.get();
        const items = snapshotLimit.docs;
        
        return items;
    }
    catch (err) {
        throw err;
    }
}

export const handleFetchDetailProduct = async (slug) => {
    try {        
        const productRef = await firestore.collection("products")
                                             .where("pro_slug", "==", slug)
                                             .limit(1)
                                             .get();
        const productDetail = productRef.docs;

        if(!productDetail.length) {
            return [];
        }
        return productDetail[0].data();
    } catch(err) {
        throw err;
    }
}