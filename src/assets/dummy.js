// const items = [
//     { id: 1, name: "Item 1", price: 100, image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/76e94279-2ca4-4e1c-b629-162351f29f73/trail-aireez-running-gilet-w03RgZ.png" },
//     { id: 2, name: "Item 2", price: 200, image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/32427f96-7b4e-4572-a9cd-f5d233f8f43a/form-dri-fit-hooded-versatile-jacket-Bz3WcP.png" },
//     { id: 3, name: "Item 3", price: 300, image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bwgis2dgnb4fxkrdxwqz/everyday-cushioned-training-low-socks-j5bHLc.png" },
//     { id: 4, name: "Item 4", price: 400, image: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
//     { id: 5, name: "Item 5", price: 500, image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
// ];
async function fetchImages() {
    const query = 'product'; // Replace this with your actual query
    const requests = Array.from({ length: 2 }, (_, i) => i + 1).map(async (i) => {
        // const clientId = import.meta.env.VITE_CLIENT_ID;
        //     console.log(clientId);
        try {
            const localStorageData = localStorage.getItem(`page${i}-${query}`);
            if (localStorageData) {
                console.log('Data from localStorage');
                return JSON.parse(localStorageData);

            }

            // require('dotenv').config();

            const clientId = import.meta.env.VITE_CLIENT_ID;
            console.log(clientId);
            // const clientId = 'J6zOTWsy5AI2yMlOlrYH6nkb2j73AzPVMcg5JqQ5B6I';
            const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${clientId}&page=${i}&per_page=30&query=${query}`);
            console.log('Rate limit:', res.headers.get('X-Ratelimit-Limit'));
            console.log('Remaining:', res.headers.get('X-Ratelimit-Remaining'));
            const data = await res.json();
            localStorage.setItem(`page${i}-${query}`, JSON.stringify(data.results.map(item => item.urls.regular)));
            return data.results.map(item => item.urls.regular);
        } catch (err) {
            console.log(err);
            return [];
        }
    });

    const results = await Promise.all(requests);
    return results.flat();
}

async function items() {
    const tempItems = await fetchImages();
    // console.log(tempItems);

    const items = tempItems.map((item, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        price: 100 * (i + 1),
        image: item
    }));

    return items;
}

export default items;