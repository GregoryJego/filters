import PropTypes from 'prop-types'
import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { FILTER } from '../constants'
import { Category } from './Category'
import { CategoryGroup } from './CategoryGroup'

export const DataList = ({ data, filter, searchValue }) => {
    const [dataToDisplay, setDataToDisplay] = useState(data)

    const isInWord = useCallback(
        (word) => {
            return word && word.toLowerCase().includes(searchValue)
        },
        [searchValue],
    )
    useEffect(() => {
        let _data = data
        if (searchValue.length) {
            _data = data.filter(
                (item) =>
                    isInWord(item.wording) ||
                    isInWord(item.description) ||
                    isInWord(item.group.name),
            )
        }
        if (filter === FILTER.GROUP) {
            const _allGroups = _data.map((element) => element.group)
            const _filteredAllGroups = Object.values(
                _allGroups.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {}),
            )
            const _dataFilteredByGroup = _filteredAllGroups.map((group) => ({
                ...group,
                elements: _data
                    .map(
                        (element) =>
                            element.group.id === group.id && {
                                id: element.id,
                                wording: element.wording,
                                description: element.description,
                            },
                    )
                    .filter(Boolean),
            }))
            setDataToDisplay(_dataFilteredByGroup)
        } else if (filter === FILTER.NAME) {
            setDataToDisplay(
                _data.sort(function (a, b) {
                    if (a.wording < b.wording) {
                        return -1
                    }
                    if (a.wording > b.wording) {
                        return 1
                    }
                    return 0
                }),
            )
        }
    }, [data, filter, isInWord, searchValue])

    const renderItem = useCallback(
        ({ item }) => {
            if (filter === FILTER.NAME)
                return <Category category={item} showCategory={true} showSeparator={true} />
            else if (filter === FILTER.GROUP) return <CategoryGroup categoryGroup={item} />
            // else
            return
        },
        [filter],
    )

    return (
        <View>
            {dataToDisplay.length ? (
                <SafeAreaView>
                    <FlatList
                        data={dataToDisplay}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                </SafeAreaView>
            ) : (
                <Text style={styles.noData}>Aucune donnée</Text>
            )}
        </View>
    )
}

DataList.propTypes = {
    data: PropTypes.array,
    filter: PropTypes.string,
    searchValue: PropTypes.string,
}

const styles = StyleSheet.create({
    noData: { marginTop: 20 },
})
