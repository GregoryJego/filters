import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native'
import { colors } from './colors'
import { DataList } from './components/DataList'
import { Header } from './components/Header'
import { urls } from './env'

export default function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState('group') // Could  be 'group' or 'name'
    const [searchValue, setSearchValue] = useState('')

    const fetchAll = useCallback(
        () =>
            Promise.all(
                urls.map((url) =>
                    fetch(url)
                        .then((response) => response.json())
                        .catch((error) => {
                            alert('Désolé, impossible de récupérer les données')
                            setIsLoading(false)
                            return
                        }),
                ),
            ),
        [],
    )

    const fetchData = useCallback(() => {
        setIsLoading(true)
        fetchAll().then((results) => {
            if (results.length < urls.length) {
                alert('Désolé, impossible de récupérer les données')
                setIsLoading(false)
                return
            }
            const allCategories = results[0]
            const visibleCategories = results[1]
            const _data = allCategories.filter(
                (d) => visibleCategories.findIndex((x) => x.id === d.id) > -1,
            )
            setData(
                _data
                    .filter((element) => element.id !== -1)
                    .map((category) => ({
                        ...category,
                        group: {
                            ...category.group,
                            color: category.group.color ? category.group.color.slice(2) : null,
                        },
                    })),
            )
            setIsLoading(false)
        })
    }, [fetchAll])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <View style={styles.globalContainer}>
            <Header filter={filter} setFilter={setFilter} setSearchValue={setSearchValue} />
            {isLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.blue} size="large" />
                </View>
            ) : data.length ? (
                <DataList
                    data={data}
                    filter={filter}
                    isLoading={isLoading}
                    searchValue={searchValue}
                    setIsLoading={setIsLoading}
                />
            ) : (
                <View style={styles.buttonRetry}>
                    <Button
                        color={colors.purple}
                        title={'Réessayer'}
                        onPress={() => {
                            fetchData()
                        }}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        fontFamily: 'Open Sans',
    },
    // bodyContainer: { backgroundColor: colors.separator, padding: 10, flex: 1 },
    loading: {
        justifyContent: 'center',
        flex: 1,
    },
    buttonRetry: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})
