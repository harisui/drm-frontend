export const paymentPageUrlRenderer = (doctor: any, apiSources:string, router:any) => {
    // localStorage.setItem('doctor', JSON.stringify(doctor));
    let path = '/generate-full-report?';
    const queryParams = {
        'slug' : encodeURIComponent(doctor?.slug || doctor?.id || ''),
        '_spt' : doctor?.specialty || 'chiropractor',
        '_spt_slug' : doctor?.specialty_url || doctor?.specialty || 'chiropractor',
        '_nme' : doctor?.name || 'Dr.',
        '_ct' : doctor?.city || '',
        '_st' : (doctor?.state || '') == 'Unknown' ? '' : (doctor?.state || ''),
        '_rt' : doctor?.rating || 0,
        '_sr' : apiSources
    }

    if(apiSources == 'iwgc'){
        queryParams.slug = encodeURIComponent(getSlugFromProfileLink(doctor.profileLink));
    }

    Object.keys(queryParams).forEach(key => {
        path += `${key}=${queryParams[key]}&`;
    })

    console.log('path', path);
    router.push(path);

};

const getSlugFromProfileLink = (profileLink: string): string | null => {
    const match = profileLink.match(/\/doctors\/([^/]+)/);
    return match ? match[1] : null;
};
