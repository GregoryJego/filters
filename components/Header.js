import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { Text, View, Pressable, TextInput, SafeAreaView, StyleSheet } from 'react-native'
import { colors } from '../colors'
import { FILTER } from '../constants'

export const Header = ({ filter, setFilter, setSearchValue }) => {
    const buttonTextStyle = useCallback(
        (selectedFilter) => {
            return {
                marginLeft: 10,
                marginRight: 5,
                borderRadius: 5,
                color: filter === selectedFilter ? colors.white : colors.grey,
                backgroundColor: filter === selectedFilter ? colors.blue : colors.blueLight,
                padding: 10,
            }
        },
        [filter],
    )
    return (
        <View style={styles.globalContainer}>
            <Text style={styles.title}>Catégories</Text>
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                        if (filter !== FILTER.GROUP) {
                            setFilter(FILTER.GROUP)
                        }
                    }}
                >
                    <Text style={buttonTextStyle(FILTER.GROUP)}>Groupe de catégorie</Text>
                </Pressable>
                <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                        if (filter !== FILTER.NAME) {
                            setFilter(FILTER.NAME)
                        }
                    }}
                >
                    <Text style={buttonTextStyle(FILTER.NAME)}>Ordre alphabétique</Text>
                </Pressable>
            </View>
            <View style={styles.searchBar}>
                <Ionicons
                    color={colors.separator}
                    name="search"
                    size={20}
                    style={{ marginRight: 10 }}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <TextInput
                        maxLength={30}
                        placeholder="Rechercher une catégorie"
                        onSubmitEditing={(event) =>
                            setSearchValue(event.nativeEvent.text.toLowerCase())
                        }
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

Header.propTypes = {
    setFilter: PropTypes.func,
    filter: PropTypes.string,
    setSearchValue: PropTypes.func,
}

const styles = StyleSheet.create({
    globalContainer: {
        backgroundColor: colors.separator,
        paddingVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    searchBar: {
        borderWidth: 1,
        borderColor: colors.separator,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.white,
    },
})
