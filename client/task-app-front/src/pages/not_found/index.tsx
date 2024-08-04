import Title from "antd/es/typography/Title";

export const NotFoundPage = ()=>{
    return(
        <div style={{ height : "100vh", display : "flex", flexFlow : "column", flexWrap : "nowrap", alignItems : "center", justifyContent : "center" }}>
            <Title type="secondary">
                404 PAGE NOT FOUND
            </Title>
        </div>
    );
}